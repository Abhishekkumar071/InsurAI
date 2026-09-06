import { useState, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Upload, FileText, CheckCircle2, Clock, Download } from 'lucide-react';
import { documentApi } from '@/api/documentApi';
import { DOCUMENT_TYPE_OPTIONS } from '@/utils/constants';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';

export default function DocumentUploadPanel({ applicationId }) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [docType, setDocType] = useState('AADHAR');

  const { data } = useQuery({
    queryKey: ['documents', applicationId],
    queryFn: () => documentApi.getMyForApplication(applicationId),
  });

  const documents = data?.data || [];

  const uploadMutation = useMutation({
    mutationFn: (file) => documentApi.upload(applicationId, docType, file),
    onSuccess: () => {
      toast.success('Document uploaded');
      queryClient.invalidateQueries({ queryKey: ['documents', applicationId] });
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Upload failed'),
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a PDF, JPG, or PNG file');
      e.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File must be 5MB or smaller');
      e.target.value = '';
      return;
    }
    uploadMutation.mutate(file);
  };

  const downloadDocument = async (document) => {
    try {
      const response = await documentApi.download(document.id);
      const blobUrl = URL.createObjectURL(response.data);
      const link = window.document.createElement('a');
      link.href = blobUrl;
      link.download = document.originalFileName || `document-${document.id}`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not download document');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Select
            options={DOCUMENT_TYPE_OPTIONS}
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          loading={uploadMutation.isPending}
        >
          <Upload size={16} /> Upload File
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <p className="text-xs text-gray-400">PDF, JPG, or PNG — max 5MB</p>

      {documents.length > 0 && (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <FileText size={16} className="text-gray-400 shrink-0" />
                <span className="truncate text-gray-700">{doc.originalFileName}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button type="button" onClick={() => downloadDocument(doc)} className="text-gray-500 hover:text-primary-600" title="Download document">
                  <Download size={15} />
                </button>
                {doc.verified ? (
                  <span className="flex items-center gap-1 text-success-600 text-xs"><CheckCircle2 size={14} /> Verified</span>
                ) : (
                  <span className="flex items-center gap-1 text-warning-600 text-xs"><Clock size={14} /> Pending</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
