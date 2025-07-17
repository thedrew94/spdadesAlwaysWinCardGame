import FastAccessButton from "./FastAccessButton";

export default function PageChooseGame({ setPage = () => {} }) {
  return (
    <div className="game_btns_start">
      <FastAccessButton
        btnText="NEW GAME"
        btnSvg="play"
        fastBtnText="1"
        fastBtnTrigger="1"
        cbFunc={() => {
          setPage(3);
        }}
      />
      <FastAccessButton
        btnText="JOIN GAME"
        btnSvg="join"
        fastBtnText="2"
        fastBtnTrigger="2"
        cbFunc={() => {
          setPage(5);
        }}
      />
      <FastAccessButton
        btnText="GO BACK"
        btnSvg="back"
        fastBtnText="3"
        fastBtnTrigger="3"
        cbFunc={() => {
          setPage(1);
        }}
      />
    </div>
  );
}
