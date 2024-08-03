import {AlertDialog} from "@radix-ui/react-alert-dialog";
import SelectWordModal from "./SelectWordModal";
import InfoModal from "./InfoModal";
import LeaderBoardModal from "./LeaderBoardModal";
import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";
import {ModalTypeEnum} from "../../state/uiSlice";

const RootModal = () => {
  const {modal} = useSelector((state: RootState) => state.ui);

  const modalMapping: {
    [key in ModalTypeEnum]: JSX.Element;
  } = {
    "": <></>,
    INFO: <InfoModal />,
    SELECT_WORD: <SelectWordModal />,
    LEADERBOARD: <LeaderBoardModal />
  };

  return (
    <AlertDialog open={modal.open}>{modalMapping[modal.type]}</AlertDialog>
  );
};

export default RootModal;
