const Error = ({message}) => {
    const errorStyling = {
      color: 'red',
      backgroundColor: 'lightgrey',
      fontSize: 22,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    if (message == null) {
      return null
    }
  
    return (
      <div style={errorStyling}>
        {message}
      </div>
    )
}

export default Error