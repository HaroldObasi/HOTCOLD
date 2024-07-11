import {useSelector} from "react-redux/es/hooks/useSelector";
import {RootState} from "../../state/PlayerStore";

const SelectWordModal = () => {
  const {modalOpen} = useSelector((state: RootState) => state.ui);

  if (modalOpen) {
    return <div>SelectWordModal</div>;
  }

  return <></>;
};

export default SelectWordModal;
