import React from 'react';

export default class Loader extends React.Component {
    render() {
        return (
            <div className='loader-wrapper'>
                <i className='fa fa-spinner fa-pulse fa-3x fa-fw'></i>
            </div>
        )
    }
}
