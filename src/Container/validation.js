import React from 'react'
class Validation extends React.Component
{
  render()
  {
    console.log(this.props);
    return(<form id="login_form" onSubmit={this.props.onSubmit}>{this.props.children}</form>)
  }
}
export default Validation;
