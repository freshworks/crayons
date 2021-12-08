import { Component, h } from '@stencil/core';

@Component({
  tag: 'fw-form-text',
  styleUrl: 'form-text.scss',
})
export class FormText {
  private initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
  };

  private validate = (state) => {
    const { username, password, passwordConfirm } = state;
    console.log({ username, password, passwordConfirm });
    return;
  };

  render() {
    return (
      <fw-form
        initialValues={this.initialValues}
        validate={this.validate}
        renderer={(props) => {
          const { errors, formProps, groupProps, labelProps, inputProps } =
            props;
          return (
            <div>
              <form {...formProps}>
                <div {...groupProps('username')}>
                  <label {...labelProps('username')}>
                    {' '}
                    Username (try "admin" or use spaces)
                  </label>
                  {/* <input {...inputProps('username')} required pattern='\d+' /> */}
                  <fw-input {...inputProps('username')} required></fw-input>
                  {/* Note: this causes the node to be added/removed from the DOM, which enabled nice transitions via CSS `animation` */}
                  {errors.username && (
                    <label class='error' {...labelProps('username')}>
                      {' '}
                      {errors.username}{' '}
                    </label>
                  )}
                </div>

                <div {...groupProps('password')}>
                  <label {...labelProps('password')}>
                    {''}
                    Password
                  </label>
                  <input {...inputProps('password')} type='password' required />
                  {errors.password && (
                    <label class='error' {...labelProps('username')}>
                      {' '}
                      {errors.password}{' '}
                    </label>
                  )}
                </div>

                <div {...groupProps('passwordConfirm')}>
                  <label {...labelProps('passwordConfirm')}>
                    {' '}
                    Confirm Password{' '}
                  </label>
                  <input
                    {...inputProps('passwordConfirm')}
                    type='password'
                    required
                  />
                  {errors.passwordConfirm && (
                    <label class='error' {...labelProps('passwordConfirm')}>
                      {' '}
                      {errors.passwordConfirm}{' '}
                    </label>
                  )}
                </div>
              </form>
              {JSON.stringify(props, null, 2)}
            </div>
          );
        }}
      />
    );
  }
}
