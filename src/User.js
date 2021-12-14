function User(props) {
    return (
      <div>
         <div>
            <h3>{props.userProp.name}</h3>
            <p>Username: {props.userProp.username}</p>
            <p>Street: {props.userProp.address.street}</p>
            <p>Suite: {props.userProp.address.suite}</p>
        </div>
      </div>
    );
  }
  
export default User;