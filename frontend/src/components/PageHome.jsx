import FastAccessButton from "./FastAccessButton";

export default function PageHome({ setPage = () => {} }) {
  return (
    <div className="game_btns_home">
      <FastAccessButton
        btnText="PLAY"
        btnSvg="play"
        fastBtnText="1"
        fastBtnTrigger="1"
        cbFunc={() => {
          setPage(2);
        }}
      />
      <FastAccessButton btnText="RULES" btnSvg="rules" fastBtnText="2" fastBtnTrigger="2" cbFunc={() => {}} />
      <FastAccessButton
        btnText="SUPPORT"
        btnSvg="love"
        fastBtnText="3"
        fastBtnTrigger="3"
        cbFunc={() => {
          setPage(6);
        }}
      />
    </div>
  );
}
