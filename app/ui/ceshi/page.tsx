import { CloseCircleOutlined } from "@ant-design/icons";
import './ceshi.css'
export default function Modal({ closemodal }: { closemodal: any }) {
    return (
        <div className="modal-mask">
            <div className="ui-lib_modal-container__V07hJ">
                <div className="ui-lib_modal-header__ez8kk">
                    <div className="ui-lib_modal-title__uDyyZ">编辑</div>
                    <div className="ui-lib_modal-header-actions__sGgzm">
                        <div className="sui-lib_modal-header-action__TQHsu">
                            <CloseCircleOutlined style={{ fontSize: "15px" }} />
                        </div>
                    </div>
                </div>
                <div className="ui-lib_modal-content___F0dm">
                    <textarea className="ui-lib_modal-input__vxrdT" defaultValue='1111111111'></textarea>
                </div>
                <div className="ui-lib_modal-footer__U6Gef">
                    <div className="ui-lib_modal-actions__Ag5eX">
                        <div className="ui-lib_modal-action__o5vae">
                            <button className="button_icon-button__VwAMf">
                                <div className="button_icon-button-text__my76e">取消</div>
                            </button>
                        </div>
                        <div className="ui-lib_modal-action__o5vae">
                            <button className="button_primary__dwYZ6">
                                <div className="button_icon-button-text__my76e">确定</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}