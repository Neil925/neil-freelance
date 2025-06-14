import { MouseEventHandler, RefObject } from "react";

export default function Dialog(
  props: {
    modalRef: RefObject<HTMLDialogElement | null>;
    children: Readonly<React.ReactNode>;
  },
) {
  const checkHide: MouseEventHandler = (event) => {
    const dialog = props.modalRef.current;

    if (!dialog) {
      return;
    }

    const rect = dialog.getBoundingClientRect();

    const isInDialog = rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX && event.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      dialog.close();
    }
  };

  return (
    <dialog
      ref={props.modalRef}
      onClick={checkHide}
      className="m-auto bg-bg-start p-5 rounded-lg drop-shadow-md drop-shadow-black backdrop:bg-black backdrop:opacity-40"
    >
      {props.children}
    </dialog>
  );
}
