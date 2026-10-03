import numpy as np


CATEGORY_RULES = {
    # (min_age, max_age, has_dependents) -> preferred categories, in priority order
    "young_no_dependents": ["TERM_LIFE", "HEALTH", "TRAVEL", "MOTOR"],
    "young_with_dependents": ["CHILD_PLAN", "TERM_LIFE", "HEALTH", "HOME"],
    "mid_career": ["HEALTH", "RETIREMENT", "HOME", "TERM_LIFE"],
    "senior": ["RETIREMENT", "HEALTH", "HOME"],
}


def rule_based_recommend(user, policy_catalog, top_n=5):
    """
    Cold-start recommendation for users with no activity history yet.
    Uses simple demographic rules rather than similarity math.
    """
    age = user.get("age")
    dependents = user.get("dependents") or 0

    if age is None:
        # No profile at all -- fall back to a generic popular mix
        bucket = "mid_career"
    elif age < 30 and dependents == 0:
        bucket = "young_no_dependents"
    elif age < 30 and dependents > 0:
        bucket = "young_with_dependents"
    elif age < 55:
        bucket = "mid_career"
    else:
        bucket = "senior"

    preferred_categories = CATEGORY_RULES[bucket]

    scored = []
    for policy in policy_catalog:
        if policy["category"] in preferred_categories:
            # Earlier category in the preference list = higher score
            rank = preferred_categories.index(policy["category"])
            score = 1.0 - (rank * 0.15)
            scored.append({
                "policyId": policy["id"],
                "policyName": policy["policyName"],
                "score": round(score, 2),
                "reason": f"Popular choice for your age group ({bucket.replace('_', ' ')})",
            })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:top_n]


def build_user_vector(user):
    """
    Normalizes user demographic fields into a 0-1 range vector:
    [age_norm, income_norm, dependents_norm, smoker_flag]
    """
    age = user.get("age") or 35
    age_norm = min(age / 80.0, 1.0)

    income_map = {
        "BELOW_3_LPA": 0.1, "LPA_3_TO_6": 0.3, "LPA_6_TO_10": 0.5,
        "LPA_10_TO_20": 0.75, "ABOVE_20_LPA": 1.0,
    }
    income_norm = income_map.get(user.get("incomeBracket"), 0.4)

    dependents_norm = min((user.get("dependents") or 0) / 5.0, 1.0)
    smoker_flag = 1.0 if user.get("smoker") else 0.0

    return np.array([age_norm, income_norm, dependents_norm, smoker_flag])


def build_policy_vector(policy):
    """
    Normalizes policy attributes the same way, so they're comparable
    to the user vector via cosine similarity.
    """
    premium_norm = min(float(policy["basePremium"]) / 100000.0, 1.0)
    coverage_norm = min(float(policy["coverageAmount"]) / 30000000.0, 1.0)
    tenure_norm = min(policy["tenureYears"] / 40.0, 1.0)

    # A crude "risk profile" proxy per category -- higher for
    # categories that skew toward older / family-oriented buyers
    category_risk = {
        "TERM_LIFE": 0.6, "HEALTH": 0.5, "MOTOR": 0.2, "TRAVEL": 0.2,
        "CHILD_PLAN": 0.4, "RETIREMENT": 0.9, "HOME": 0.5, "GROUP_INSURANCE": 0.3,
    }.get(policy["category"], 0.5)

    return np.array([category_risk, premium_norm, coverage_norm, tenure_norm])


def cosine_similarity(a, b):
    dot = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


def content_based_recommend(user, policy_catalog, viewed_ids, applied_ids, top_n=5):
    """
    Content-based filtering: compares the user's demographic vector
    against every policy's feature vector using cosine similarity,
    and boosts policies similar to ones the user already viewed/applied to.
    """
    user_vector = build_user_vector(user)

    interacted_ids = set(viewed_ids or []) | set(applied_ids or [])

    scored = []
    for policy in policy_catalog:
        policy_vector = build_policy_vector(policy)
        similarity = cosine_similarity(user_vector, policy_vector)

        # Small boost if this policy shares a category with something
        # the user already interacted with
        boost = 0.0
        interacted_categories = {
            p["category"] for p in policy_catalog if p["id"] in interacted_ids
        }
        if policy["category"] in interacted_categories:
            boost = 0.15

        final_score = min(similarity + boost, 1.0)

        # Don't re-recommend something already applied to
        if policy["id"] in applied_ids:
            continue

        scored.append({
            "policyId": policy["id"],
            "policyName": policy["policyName"],
            "score": round(float(final_score), 2),
            "reason": "Matches your profile and browsing interests"
                      if boost > 0 else "Matches your demographic profile",
        })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:top_n]


def get_recommendations(user_data, top_n=5):
    """
    Entry point: decides which algorithm to use based on whether the
    user has any recorded activity yet (hybrid / cold-start handling).
    """
    catalog = user_data.get("policyCatalog", [])
    viewed_ids = user_data.get("viewedPolicyIds", [])
    applied_ids = user_data.get("appliedPolicyIds", [])

    has_activity = bool(viewed_ids or applied_ids)
    has_profile = user_data.get("age") is not None

    if not has_activity and not has_profile:
        # Total cold start -- no profile, no activity. Just return
        # a generic popular mix using default demographic assumptions.
        return rule_based_recommend(user_data, catalog, top_n)

    if not has_activity:
        # Has a profile but no browsing history yet
        return rule_based_recommend(user_data, catalog, top_n)

    # Has enough signal for content-based filtering
    return content_based_recommend(user_data, catalog, viewed_ids, applied_ids, top_n)