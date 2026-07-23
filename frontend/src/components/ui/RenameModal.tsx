import Modal from "./Modal";

interface Props {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const RenameModal = ({
  open,
  value,
  onChange,
  onClose,
  onSave,
}: Props) => {
  return (
    <Modal
      open={open}
      title="Rename Conversation"
      onClose={onClose}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-2xl
          border
          border-(--border-color)
          bg-(--bg-secondary)
          px-4
          py-3
          text-(--text-primary)
          outline-none
          focus:border-blue-500
        "
      />

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="
            rounded-xl
            border
            border-(--border-color)
            px-5
            py-2
            text-(--text-primary)
          "
        >
          Cancel
        </button>

        <button
          onClick={onSave}
          className="
            rounded-xl
            bg-blue-600
            px-5
            py-2
            text-white
          "
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default RenameModal;