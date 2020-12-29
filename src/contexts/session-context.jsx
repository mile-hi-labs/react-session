import React, { Component } from 'react';
import LocalStorage from 'local-storage';
import { logger } from 'utils/helpers';

const SessionContext = React.createContext();

class SessionProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: null,
      model: this.props.model || 'user',
      loadUser: this.loadUser.bind(this),
      authenticated: this.authenticated.bind(this),
      authenticate: this.authenticate.bind(this),
      logout: this.logout.bind(this),
      loaded: false,
    };
  }


  // Hooks
  componentDidMount() {
    let userId = LocalStorage.get('userId');
    let token = LocalStorage.get('token');
    userId && token ? this.loadUser(this.state.model, userId, token, this.props.params) : this.setState({ loaded: true });
  }


  // Methods
  async loadUser(modelName, modelId, token, params = {}) {
    try {
      if (!this.props.store) {  return };
      this.props.store.adapterFor('app').token = token;
      let model = await this.props.store.queryRecord(modelName, modelId, params);
      logger('Session authenticated: ', this.state);
      await this.setState({ token: token, user: model });
    } catch(e) {
      await this.logout();
    } finally {
      this.setState({ loaded: true });
    }
  }

  async authenticate(model, data) {
    LocalStorage.set('userId', data.id);
    LocalStorage.set('token', data.token);
    return await this.loadUser(model, data.id, data.token, {});
  }

  async logout() {
    localStorage.clear();
    logger('Session terminated: ', this.state);
    await this.setState({ userId: '', token: '', user: {} });
  }

  authenticated() {
    return this.state.user.id ? true : false;
  }


  // Render
  render() {
    const { loaded } = this.state;
    const { store, children } = this.props;

    return (
      <SessionContext.Provider value={this.state}>
        {children}
      </SessionContext.Provider>
    )
  }
};

const withSession = function(WrappedFunction) {
  return class extends Component {
    render() {
      return (
        <SessionContext.Consumer>
          {context => <WrappedFunction session={context} {...this.props} />}
        </SessionContext.Consumer>
      );
    }
  }
};

export { SessionProvider, withSession };
