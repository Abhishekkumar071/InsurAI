import os
import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

from recommender import get_recommendations

load_dotenv()

JAVA_BACKEND_URL = os.getenv("JAVA_BACKEND_URL", "http://localhost:8080")
INTERNAL_API_KEY = os.getenv("INTERNAL_API_KEY")
# print(f"DEBUG: Loaded INTERNAL_API_KEY = [{INTERNAL_API_KEY}]")
# print(f"DEBUG: Loaded JAVA_BACKEND_URL = [{JAVA_BACKEND_URL}]")
app = FastAPI(title="InsurAI Recommendation Service")


class RecommendRequest(BaseModel):
    userId: int
    topN: int = 5


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/recommend")
def recommend(request: RecommendRequest):
    """
    Fetches the user's profile/activity/catalog data from the Java
    backend's internal data-export API, then computes recommendations.
    """
    try:
        response = requests.get(
            f"{JAVA_BACKEND_URL}/api/internal/data-export/user/{request.userId}",
            headers={"X-Internal-Api-Key": INTERNAL_API_KEY},
            timeout=5,
        )
        response.raise_for_status()
        user_data = response.json()["data"]

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Could not reach data source: {e}")

    recommendations = get_recommendations(user_data, top_n=request.topN)
    return {"userId": request.userId, "recommendations": recommendations}