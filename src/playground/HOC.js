import React from 'react';
import ReactDOM from 'react-dom';


const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is {props.info}</p>
  </div>
)

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private do not share</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuth = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthorized ? <WrappedComponent {...props} /> : <p>You Are Not Authorized!!!!</p>}
    </div>
  )
}

const AdminInfo = withAdminWarning(Info);
const IsAuthorized = requireAuth(Info);

ReactDOM.render(<IsAuthorized isAuthorized={false} info={'you are dying'}/>, document.getElementById('app'));