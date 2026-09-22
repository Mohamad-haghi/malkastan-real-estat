import { Modal } from '@/components/ui/Modal';
import { RequestForm } from '@/components/forms/RequestForm';
import type { Property, RequestType } from '@/types';

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  type: RequestType;
  property?: Property;
}

export function RequestModal({ open, onClose, type, property }: RequestModalProps) {
  if (!open) return null;
  return (
    <Modal open={open} onClose={onClose} size="lg">
      <RequestForm property={property} type={type} onClose={onClose} />
    </Modal>
  );
}
