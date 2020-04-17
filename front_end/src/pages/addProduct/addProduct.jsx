import React,{ useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import addSymbol from "../../assets/add.svg";

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

export const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="addProduct-main">
      <div className="addPicture-frame">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <img src={addSymbol} className="addlogo" />
          <p>เพิ่มรูปภาพ</p>
        </div>
        <div>{thumbs}</div>
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
          <button type="submit" className="btn">
            ยืนยันการลงประมูลสินค้า
          </button>
        </div>
      </div>
    </div>
  );
};
