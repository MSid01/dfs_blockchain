import { useEffect, useState } from "react";
import "./Modal.css";
const Modal = ({ setModalOpen, contract }) => {
  const [addressList, setAddressList] = useState([]);
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  const disallow_acc = async (address) => {
    console.log(address);
    await contract.disallow(address);
    setModalOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      const options = addressList;
      let allowedList = [];
      let disallowedList = [];
      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        if (opt.access) {
          allowedList.push(opt);
        } else {
          disallowedList.push(opt);
        }
      }
      setAddressList([...allowedList, ...disallowedList]);
      // setAddressList(...allowedList, ...disallowedList);
      // let select = document.querySelector("#selectNumber");
      // const options = addressList;

      // for (let i = 0; i < options.length; i++) {
      //   let opt = options[i];
      //   let e1 = document.createElement("option");
      //   e1.textContent = opt;
      //   e1.value = opt;
      //   select.appendChild(e1);
      // }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
          </div>
          {/* <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form> */}
          <div className="access_list">People With Access</div>
          <div>
            {addressList.map((item, i) => {
              return (
                <div class="access_list_item" key={i}>
                  <div class="access_list_item_name">
                    <div>{item.user.substring(0, 20)}...</div>
                    <div>{item.access ? "Allowed" : "Removed"}</div>
                  </div>
                  {item.access && (
                    <div
                      class="remove_access"
                      onClick={() => {
                        disallow_acc(item.user);
                      }}
                    >
                      remove
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
