import Modal from "./Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal = ({
  open,
  onClose,
  onDelete,
}: Props) => {
  return (
    <Modal
      open={open}
      title="Delete Conversation"
      onClose={onClose}
    >
      <p
        className="
          text-(--text-secondary)
          leading-7
        "
      >
        Are you sure you want to delete this
        conversation?
      </p>

      <p
        className="
          mt-2

          text-sm

          text-red-500
        "
      >
        This action cannot be undone.
      </p>

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

            transition

            hover:bg-black/10
            dark:hover:bg-white/10
          "
        >
          Cancel
        </button>

        <button
          onClick={onDelete}
          className="
            rounded-xl

            bg-red-600

            px-5
            py-2

            text-white

            transition

            hover:bg-red-700
          "
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;