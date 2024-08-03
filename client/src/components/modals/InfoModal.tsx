import {
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../ui/alert-dialog";
import {RootState} from "../../state/PlayerStore";
import {useSelector} from "react-redux";

type Props = {};

const InfoModal = (props: Props) => {
  const {info} = useSelector((state: RootState) => state.ui.modal);
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-center">Information</AlertDialogTitle>
      </AlertDialogHeader>
      <div>{info}</div>
      {/* <div className="flex justify-between">
        {targetWordOptions.map((item, key) => (
          <Button
            disabled={loading}
            className="bg-sky-300 active:bg-sky-500 hover:bg-sky-500 rounded-full"
            key={key}
            onClick={() => onSelectOption(key)}
          >
            {item}
          </Button>
        ))}
      </div> */}
      <AlertDialogFooter></AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default InfoModal;
