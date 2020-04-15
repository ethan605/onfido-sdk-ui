import { h, Component } from 'preact'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { compose } from '~utils/func'
import { setNavigationDisabled } from '../ReduxAppWrapper/store/actions/globals'
import { withFullScreenState } from '../FullScreen'
import style from './style.css'
import { isDesktop } from '~utils/index'
import { localised } from '../../locales'

export const withNavigationDisabledState = connect(
  ({ globals: { isNavigationDisabled } }) => ({ isNavigationDisabled })
)

export const withNavigationDisableAction = connect(null, (dispatch) => ({
  setNavigationDisabled: (value) => dispatch(setNavigationDisabled(value)),
}))

class NavigationBar extends Component {

  componentDidMount() {
    if (!this.props.disabled && this.backBtn) {
      this.backBtn.setAttribute('tabindex', 2)
    }
  }

  componentDidUpdate(prevProps) {
    const { disabled } = this.props
    if (disabled !== prevProps.disabled && !disabled) {
      this.backBtn.setAttribute('tabindex', 2)
    }
  }

  render() {
    const {
      back,
      translate,
      disabled,
      isFullScreen,
      className,
    } = this.props
    return (
      <div
        className={classNames(className, style.navigation, {
          [style.fullScreenNav]: isFullScreen,
        })}
      >
        <button
          type="button"
          aria-label={translate('back')}
          tabIndex={disabled || isFullScreen ? null : 2}
          ref={(node) => (this.backBtn = node)}
          onClick={back}
          className={classNames(style.back, {
            [style.disabled]: disabled,
            [style.backHoverDesktop]: isDesktop,
          })}
        >
          <span className={style.iconBack} />
          <span className={style.label} aria-hidden="true">
            {translate('back')}
          </span>
        </button>
      </div>
    )
  }
}

export default compose(withFullScreenState, localised)(NavigationBar)
