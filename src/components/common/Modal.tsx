import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
type IProps = {
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  childComponent: any;
  header: string;
};
export default function Modal(props: IProps) {
  return (
    <>
      <Dialog
        open={props.isModalOpen}
        handler={props.setModalOpen}
        placeholder=""
      >
        <DialogHeader placeholder="">{props.header}</DialogHeader>
        <DialogBody placeholder="">{props.childComponent}</DialogBody>
      </Dialog>
    </>
  );
}
