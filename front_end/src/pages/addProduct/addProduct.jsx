import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { useDropzone } from "react-dropzone";
import addSymbol from "../../assets/add.svg";
import NavigationPrompt from "react-router-navigation-prompt";
import Modal from "react-responsive-modal";

var pic = 0;

export const AddProduct = () => {
  const history = useHistory();
  const imageMaxSize = 3000000; // bytes
  const [pic1, setPic1] = useState(null);
  const [pic2, setPic2] = useState(null);
  const [pic3, setPic3] = useState(null);
  const [pic4, setPic4] = useState(null);
  const [bigImg, setBigImg] = useState(null);
  const [countPic, setCountPic] = useState(pic);
  const [outcome, setOutcome] = useState(1);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxSize: imageMaxSize,
    onDrop: useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // Do whatever you want with the file contents
          console.log(pic);
          if (pic === 0) {
            setPic1(URL.createObjectURL(file));
            setOutcome(0);
            pic++;
          } else if (pic === 1) {
            setPic2(URL.createObjectURL(file));
            setOutcome(0);
            pic++;
          } else if (pic === 2) {
            setPic3(URL.createObjectURL(file));
            setOutcome(0);
            pic++;
          } else if (pic === 3) {
            setPic4(URL.createObjectURL(file));
            setOutcome(0);
            pic++;
          }
          setCountPic(pic);
        };
        reader.readAsArrayBuffer(file);
      });
    }, []),
  });

  function resetPicture() {
    setOutcome(1);
    pic = 0;
    setCountPic(pic);
    console.log(pic);
    setPic1(null);
    setPic2(null);
    setPic3(null);
    setPic4(null);
  }

  return (
    <>
      <NavigationPrompt
        afterConfirm={() => resetPicture()}
        renderIfNotActive={false}
        disableNative={true}
        when={(crntLocation, nextLocation) =>
          !nextLocation ||
          (!nextLocation.pathname.startsWith(crntLocation.pathname) &&
            pic !== 0)
        }
      >
        {({ isActive, onCancel, onConfirm }) => {
          if (isActive) {
            return (
              <Modal
                open={true}
                center={true}
                showCloseIcon={false}
                closeOnEsc={false}
                closeOnOverlayClick={false}
              >
                <div className="alert-container">
                  <h2>การลงสินค้ายังไม่เสร็จสิ้น</h2>
                  <p className="alertMessage">
                    คุณแน่ใจหรือไม่ว่าต้องการออกจากหน้านี้
                  </p>
                </div>

                <button onClick={onCancel} className="btn-no">
                  ไม่ ฉันต้องการอยู่ในหน้านี้
                </button>
                <button onClick={onConfirm} className="btn-yes">
                  ใช่ ฉันต้องการออกจากหน้านี้
                </button>
              </Modal>
            );
          }
        }}
      </NavigationPrompt>
      {firebase.auth().currentUser ? (
        <div className="addProduct-main">
          <Helmet>
            <title>
              eBid - Online Bidding | Software Development Processes KMITL
            </title>
          </Helmet>
          <div className="addPicture-frame">
            {bigImg === null ? (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} disabled={countPic === 4} />
                <img src={addSymbol} className="addlogo" alt="add-Logo" />
                <p>เพิ่มรูปภาพ</p>
              </div>
            ) : (
              <div className="big-preview">
                <img src={bigImg} className="big-img" alt="img-preview" />
              </div>
            )}
            {outcome === 0 ? (
              <div className="preview-box">
                {countPic === 1 ? (
                  <>
                    <div
                      className="img-box"
                      onMouseOver={() => setBigImg(pic1)}
                      onMouseLeave={() => setBigImg(null)}
                    >
                      <img src={pic1} className="small-img" alt="small-pic1" />
                    </div>
                  </>
                ) : (
                  ""
                )}
                {countPic === 2 ? (
                  <>
                    <div
                      className="img-box"
                      onMouseOver={() => setBigImg(pic1)}
                      onMouseLeave={() => setBigImg(null)}
                    >
                      <img src={pic1} className="small-img" alt="small-pic1" />
                    </div>
                    <div
                      className="img-box"
                      onMouseOver={() => setBigImg(pic2)}
                      onMouseLeave={() => setBigImg(null)}
                    >
                      <img src={pic2} className="small-img" alt="small-pic2" />
                    </div>
                  </>
                ) : (
                  ""
                )}
                {countPic === 3 ? (
                  <>
                    <div
                      className="img-box"
                      onMouseOver={() => setBigImg(pic1)}
                      onMouseLeave={() => setBigImg(null)}
                    >
                      <img src={pic1} className="small-img" alt="small-pic1" />
                    </div>
                    <div
                      className="img-box"
                      onMouseOver={() => setBigImg(pic2)}
                      onMouseLeave={() => setBigImg(null)}
                    >
                      <img src={pic2} className="small-img" alt="small-pic2" />
                    </div>
                    <div
                      className="img-box"
                      onMouseOver={() => setBigImg(pic3)}
                      onMouseLeave={() => setBigImg(null)}
                    >
                      <img src={pic3} className="small-img" alt="small-pic3" />
                    </div>
                  </>
                ) : (
                  ""
                )}
                {countPic === 4 ? (
                  <>
                    <div
                      className="img-box"
                      onMouseOver={() => setBigImg(pic1)}
                      onMouseLeave={() => setBigImg(null)}
                    >
                      <img src={pic1} className="small-img" alt="small-pic1" />
                    </div>
                    <div
                      className="img-box"
                      onMouseOver={() => setBigImg(pic2)}
                      onMouseLeave={() => setBigImg(null)}
                    >
                      <img src={pic2} className="small-img" alt="small-pic2" />
                    </div>
                    <div
                      className="img-box"
                      onMouseOver={() => setBigImg(pic3)}
                      onMouseLeave={() => setBigImg(null)}
                    >
                      <img src={pic3} className="small-img" alt="small-pic3" />
                    </div>
                    <div
                      className="img-box"
                      onMouseOver={() => setBigImg(pic4)}
                      onMouseLeave={() => setBigImg(null)}
                    >
                      <img src={pic4} className="small-img" alt="small-pic4" />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            <div
              className={countPic === 4 ? "page-contain-red" : "page-contain"}
            >
              จำนวนรูป {countPic} / 4
            </div>
            {outcome === 0 ? (
              <div className="button-container">
                <button
                  type="reset"
                  className="btn"
                  onClick={() => resetPicture()}
                >
                  รีเซ็ทรูปภาพ
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="addProduct-detail-box">
            <div className="addProduct-detail">
              <label>
                ชื่อสินค้า :{" "}
                <input
                  type="text"
                  placeholder="กรอกชื่อสินค้า"
                  id="productName"
                  name="productName"
                  required
                  minLength="5"
                />
              </label>
              <br />
              <label>
                ราคาเริ่มต้น :{" "}
                <input
                  type="number"
                  placeholder="กรอกราคาเริ่มต้น"
                  id="productStartPrice"
                  name="productStartPrice"
                />
                eCoins
              </label>
              <br />
              <label>
                หมดเวลา :{" "}
                <input type="date" id="productTimeOut" name="productTimeOut" />
                <input
                  type="time"
                  id="productTimeOut2"
                  name="productTimeOut2"
                />
              </label>
              <br />
              <label>
                รายละเอียดสินค้า :
                <br />
                <textarea
                  placeholder="กรอกรายละเอียดสินค้า"
                  id="productDetail"
                  name="productDetail"
                  required
                  minLength="5"
                />
              </label>
              <button type="submit" className="btn-submit">
                ยืนยันการลงประมูลสินค้า
              </button>
            </div>
          </div>
        </div>
      ) : (
        history.push("/login?from=addproduct")
      )}
    </>
  );
};