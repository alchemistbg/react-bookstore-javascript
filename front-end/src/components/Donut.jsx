import React from 'react';

function Donut() {
    return (
        <div className="donut-wrapper">
            <p className="donut-text">Loading...</p>
            <div className="donut donut.odd">
                <div className="donut">
                    <div className="donut donut.odd">
                        <div className="donut">
                            {/* <div className={`${donut.donut} ${donut.odd}`}> */}
                            {/* <div className={donut.donut}>
                                </div> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Donut;