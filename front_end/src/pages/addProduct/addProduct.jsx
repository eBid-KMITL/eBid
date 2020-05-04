import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import firebase, { firestore } from "firebase";
import { useDropzone } from "react-dropzone";
import addSymbol from "../../assets/add.svg";
import NavigationPrompt from "react-router-navigation-prompt";
import Modal from "react-responsive-modal";
import moment from "moment";

var pic = 0;

export const AddProduct = () => {
  const now = moment().add("1", "d").format("YYYY-MM-DD");
  const history = useHistory();
  const imageMaxSize = 3000000; // bytes
  const [prepic1, setprepic1] = useState(null);
  const [prepic2, setprepic2] = useState(null);
  const [prepic3, setprepic3] = useState(null);
  const [prepic4, setprepic4] = useState(null);
  const [pic1, setPic1] = useState(null);
  const [pic2, setPic2] = useState(null);
  const [pic3, setPic3] = useState(null);
  const [pic4, setPic4] = useState(null);
  const [bigImg, setBigImg] = useState(null);
  const [countPic, setCountPic] = useState(pic);
  const [outcome, setOutcome] = useState(1);
  const [alerted, setAlerted] = useState(false);

  const db = firebase.firestore()
  let keepurl = []

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxSize: imageMaxSize,
    onDrop: useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          if (pic === 0) {
            setPic1(URL.createObjectURL(file));
            setprepic1(file)
            setOutcome(0);
            pic++;
          } else if (pic === 1) {
            setPic2(URL.createObjectURL(file));
            setprepic2(file)
            setOutcome(0);
            pic++;
          } else if (pic === 2) {
            setPic3(URL.createObjectURL(file));
            setprepic3(file)
            setOutcome(0);
            pic++;
          } else if (pic === 3) {
            setPic4(URL.createObjectURL(file));
            setprepic4(file)
            setOutcome(0);
            pic++;
          }
          setCountPic(pic);
        };
        reader.readAsArrayBuffer(file);
      });
    }, []),
  });

  function checkForActivatedAlert() {
    if (
      pic !== 0 ||
      document.getElementById("productName").value !== "" ||
      document.getElementById("category").value !== "" ||
      document.getElementById("productStartPrice").value !== "" ||
      document.getElementById("productTimeOut").value !== "" ||
      document.getElementById("productTimeOut2").value !== "" ||
      document.getElementById("productDetail").value !== ""
    ) {
      setAlerted(true);
    }
    else {
      setAlerted(false);
    }
  }

  function resetPicture() {
    setOutcome(1);
    pic = 0;
    setCountPic(pic);
    setPic1(null);
    setPic2(null);
    setPic3(null);
    setPic4(null);
  }

  function sendProduct(e) {
    e.preventDefault();
    if (pic1 == null || pic2 == null) {
      alert("ไม่พบรูปภาพ กรุณาลงรูปสินค้าอย่างน้อย 2 รูป")
    }
    else {
      db.collection("Product").add({
        name: document.getElementById('productName').value
      }).then(record => {
        keepurl = []
        //หมุน ๆ
        const storageRef = firebase.storage().ref("imageProduct/" + record.id).child("pic1").put(prepic1);
    storageRef.on("state_changed", snapshot => {
    },
      error => {
        console.log(error.message)
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          keepurl.push({
            url: url,
            order: 1
          })
        }).then(() => {
          if (prepic2) {
            const storageRef = firebase.storage().ref("imageProduct/" + record.id).child("pic2").put(prepic2);
            storageRef.on("state_changed", snapshot => {
            },
              error => {
                console.log(error.message)
              },
              () => {
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                  keepurl.push({
                    url: url,
                    order: 2
                  })
                }).then(() => {
                  if (prepic3) {
                    const storageRef = firebase.storage().ref("imageProduct/" + record.id).child("pic3").put(prepic3);
                    storageRef.on("state_changed", snapshot => {
                    },
                      error => {
                        console.log(error.message)
                      },
                      () => {
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {
                          keepurl.push({
                            url: url,
                            order: 3
                          })
                        }).then(() => {
                          if (prepic4) {
                            const storageRef = firebase.storage().ref("imageProduct/" + record.id).child("pic4").put(prepic4);
                            storageRef.on("state_changed", snapshot => {
                            },
                              error => {
                                console.log(error.message)
                              },
                              () => {
                                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                                  keepurl.push({
                                    url: url,
                                    order: 4
                                  })
                                }).then(() => {
                                  //หยุดหมุน
                                  console.log(keepurl)
                                })
                              }
                            );
                          }
                          else{
                            //หยุดหมุน
                            console.log(keepurl)
                          }
                        })
                      }
                    );
                  }
                  else{
                    //หยุดหมุน
                    console.log(keepurl)
                  }
                })
              }
            );
          }
        })
      }
    );
      }).catch(err => {
          console.log(err)
        })
    }
  }



  return (
    <>
      <NavigationPrompt
        afterConfirm={() => resetPicture()}
        disableNative={true}
        when={(crntLocation, nextLocation) =>
          !nextLocation ||
          (!nextLocation.pathname.startsWith(crntLocation.pathname) && alerted)
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
                <input {...getInputProps()} disabled={countPic === 4} onInput={() => checkForActivatedAlert()} />
                <img src={addSymbol} className="addlogo" alt="add-Logo" />
                <p>ลากและวางไฟล์รูปเพื่อเพิ่มรูปภาพ</p>
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
              <form onSubmit={e => sendProduct(e)}>
                <label>
                  ชื่อสินค้า :{" "}
                  <input
                    type="text"
                    placeholder="กรอกชื่อสินค้า"
                    id="productName"
                    name="productName"
                    required
                    minLength="5"
                    onInput={() => checkForActivatedAlert()}

                  />
                </label>
                <br />
                <label for="category">{"  "}หมวดหมู่ : </label>
                <select id="category" required onInput={() => checkForActivatedAlert()}>
                  <option disabled>เลือกหมวดหมู่...</option>
                  <option value="1">การ์ตูน</option>
                  <option value="2">ของสะสม</option>
                  <option value="3">ของเล่น | เกมส์</option>
                  <option value="4">คอมพิวเตอร์ | โทรศัพท์มือถือ</option>
                  <option value="5">หนังสือ | สิ่งพิมพ์</option>
                  <option value="6">แฟชั่น</option>
                  <option value="7">ภาพยนตร์ | วิดีโอ | ดีวีดี</option>
                  <option value="8">อิเล็กทรอนิกส์</option>
                </select>
                <br />
                <label>
                  ราคาเริ่มต้น :{" "}
                  <input
                    type="number"
                    placeholder="กรอกราคาเริ่มต้น"
                    id="productStartPrice"
                    name="productStartPrice"
                    min="1"
                    required
                    onInput={() => checkForActivatedAlert()}
                  />
                  eCoins
                </label>
                <br />
                <label>
                  หมดเวลา :{" "}
                  <input
                    type="date"
                    id="productTimeOut"
                    name="productTimeOut"
                    min={now}
                    required
                    onInput={() => checkForActivatedAlert()}
                  />
                  <input
                    type="time"
                    id="productTimeOut2"
                    name="productTimeOut2"
                    required
                    onInput={() => checkForActivatedAlert()}
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
                    minLength="20"
                    onInput={() => checkForActivatedAlert()}
                  />
                </label>
                <button type="submit" className="btn-submit">
                  ยืนยันการลงประมูลสินค้า
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
          history.push("/login")
        )}
    </>
  );
};
