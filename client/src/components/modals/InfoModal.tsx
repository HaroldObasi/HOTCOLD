import {
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../ui/alert-dialog";
import {RootState} from "../../state/PlayerStore";
import {useSelector} from "react-redux";

const InfoModal = () => {
  const {info} = useSelector((state: RootState) => state.ui.modal);
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-center">Information</AlertDialogTitle>
      </AlertDialogHeader>
      <div>{info}</div>
      <AlertDialogFooter></AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default InfoModal;
