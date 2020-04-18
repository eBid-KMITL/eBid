import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import addSymbol from "../../assets/add.svg";

export const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [upload, setUpload] = useState(false);
  const [bigImg, setBigImg] = useState("");
  const [outcome, setOutcome] = useState(0);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length + files.length < 5 && acceptedFiles.length > 0) {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        setBigImg(files.preview);
        setOutcome(0);
        setUpload(true);
      } else {
        setOutcome(1);
      }
    },
  });

  function resetPicture() {
    setUpload(false);
    setFiles([]);
  }

  const preview = files.map((file) => (
    <div className="img-box" onMouseOver={() => setBigImg(file.preview)}>
      <img src={file.preview} className="small-img" alt="small-pic" />
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="addProduct-main">
      <div className="addPicture-frame">
        {upload === false ? (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <img src={addSymbol} className="addlogo" alt="add-Logo" />
            <p>เพิ่มรูปภาพ</p>
          </div>
        ) : (
          <div className="big-preview">
            <img src={bigImg} className="big-img" />
          </div>
        )}
        <div className="preview-box">
          {outcome === 0 ? (
            preview
          ) : (
            <p className="p5">คุณอัปโหลดรูปภาพมากเกินไป</p>
          )}
        </div>
        {files.length !== 0 ? (
          <div className="button-container">
            <button type="reset" className="btn" onClick={() => resetPicture()}>
              รีเซ็ทรูปภาพ
            </button>
            <button
              disabled={files.length === 4}
              type="button"
              className="btn"
              onClick={() => getRootProps()}
            >
              เพิ่มรูปภาพ
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
            <input type="time" id="productTimeOut2" name="productTimeOut2" />
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
  );
};
