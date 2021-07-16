import React from 'react';
import PropTypes from 'prop-types';

Modal.propTypes = {

};

function Modal(props) {
    if (!props.show) {
        return null
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        Modal Title
                    </h4>
                    <div className="modal-body">
                        This is modal cetent
                    </div>
                    <div className="modal-footer">
                        <button className="button">No</button>
                        <button className="button">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;