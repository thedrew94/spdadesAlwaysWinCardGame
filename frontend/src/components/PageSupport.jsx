import { svgSelector } from "../utils/svgSelector";
import FastAccessButton from "./FastAccessButton";

export default function PageSupport({ setPage = () => {} }) {
  return (
    <div className="game_btns_home">
      <FastAccessButton btnText="BUYME A COFFEE" btnSvg="coffee" fastBtnText="1" fastBtnTrigger="1" cbFunc={() => {}} />
      <FastAccessButton btnText="PAYPAL" btnSvg="rules" fastBtnText="2" fastBtnTrigger="2" cbFunc={() => {}} />
      <FastAccessButton btnText="FOLLOW ME" btnSvg="linkedin" fastBtnText="3" fastBtnTrigger="3" cbFunc={() => {}} />
      <FastAccessButton
        btnText="GO BACK"
        btnSvg="back"
        fastBtnText="4"
        fastBtnTrigger="4"
        cbFunc={() => {
          setPage(1);
        }}
      />
    </div>
  );
}
