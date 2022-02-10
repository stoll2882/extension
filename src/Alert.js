import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => (
  <div className="alert-wrapper" style={{zIndex: "500", position:"fixed", width:"750px", marginTop:"0", marginBottom:"50px", textAlign:"center", display:"flex", justifyContent:"center", backgroundColor: "lightgreen"}}>
    {alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}  style={{width:"25%"}}>
        {alert.msg}
      </div>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);