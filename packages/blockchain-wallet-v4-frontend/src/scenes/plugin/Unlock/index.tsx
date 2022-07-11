import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect, ConnectedProps } from 'react-redux'
import { bindActionCreators, compose, Dispatch } from 'redux'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'

import { Button, Text } from 'blockchain-info-components'
import { Flex } from 'components/Flex'
import Form from 'components/Form/Form'
import FormGroup from 'components/Form/FormGroup'
import FormItem from 'components/Form/FormItem'
import FormLabel from 'components/Form/FormLabel'
import PasswordBox from 'components/Form/PasswordBox'
import { actions, selectors } from 'data'
import { RootState } from 'data/rootReducer'
import { required, validStrongPassword } from 'services/forms'

const UNLOCK_FORM = 'UNLOCK_FORM'

const Wrapper = styled(Flex)`
  input {
    background-color: transparent !important;
  }
`

const PasswordBoxStyled = styled(PasswordBox)`
  & input {
    background-color: transparent !important;
  }
`

const Unlock = (props: Props) => {
  const onSubmit = (e) => {
    e.preventDefault()
    props.formActions.continueLoginProcess()
  }

  useEffect(() => {
    chrome.storage.session.get('password', (result) => {
      props.formActions.change(UNLOCK_FORM, 'password', result.password)
    })
  }, [])

  const { formValues } = props
  const passwordValue = formValues?.password || ''

  const passwordError = passwordValue.length > 0 && !!validStrongPassword(passwordValue)

  return (
    <Wrapper flexDirection='column' justifyContent='space-between' style={{ height: '100%' }}>
      <Flex flexDirection='column' alignItems='center'>
        <Text weight={700} size='20px' color='white'>
          <FormattedMessage
            id='plugin.welcomeBackTitle'
            defaultMessage='Welcome back to Blockchain.com'
          />
        </Text>
      </Flex>
      <Flex alignItems='center'>
        <Form override onSubmit={onSubmit}>
          <FormGroup>
            <FormItem>
              <FormLabel htmlFor='confirmationPassword' id='confirmationPassword'>
                <FormattedMessage defaultMessage='Password' id='plugin.password' />
              </FormLabel>
              <Field
                component={PasswordBoxStyled}
                data-e2e='unlockPassword'
                name='password'
                placeholder='Enter Password'
                validate={[required]}
              />
            </FormItem>
          </FormGroup>
          <Button
            disabled={!passwordValue.length || passwordError}
            type='submit'
            width='100%'
            data-e2e='unlock-btn'
          >
            <Text>
              <FormattedMessage id='plugin.unlock' defaultMessage='Unlock' />
            </Text>
          </Button>
        </Form>
      </Flex>
    </Wrapper>
  )
}

const mapStateToProps = (state: RootState): LinkStatePropsType => ({
  formValues: selectors.form.getFormValues(UNLOCK_FORM)(state) as { password: string }
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  alertActions: bindActionCreators(actions.alerts, dispatch),
  analyticsActions: bindActionCreators(actions.analytics, dispatch),
  authActions: bindActionCreators(actions.auth, dispatch),
  formActions: bindActionCreators(actions.form, dispatch),
  signupActions: bindActionCreators(actions.signup, dispatch),
  websocketActions: bindActionCreators(actions.ws, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type LinkStatePropsType = {
  formValues: { password: string }
}

export type Props = ConnectedProps<typeof connector> & LinkStatePropsType

const enhance = compose(reduxForm<{}, Props>({ form: UNLOCK_FORM }), connector)

export default enhance(Unlock) as React.ComponentClass<Props>
