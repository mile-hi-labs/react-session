import React, { Component } from 'react';
import LocalStorage from 'local-storage';
import { logger } from 'utils/helpers';

const SessionContext = React.createContext();

class SessionProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelName: this.props.modelName || 'user',
      user: {},
      token: null,
      loadUser: this.loadUser.bind(this),
      authenticated: this.authenticated.bind(this),
      authenticate: this.authenticate.bind(this),
      logout: this.logout.bind(this),
      loaded: false,
    };
  }


  // Hooks
  componentDidMount() {
    let store = this.props.store;
    let userId = LocalStorage.get('userId');
    let token = LocalStorage.get('token');
    userId && token ? this.loadUser(store, this.state.modelName, userId, token, this.props.params) : this.setState({ loaded: true });
  }


  // Methods
  async loadUser(store, modelName, modelId, token, params = {}) {
    try {
      store.adapterFor('').set('token', token);
      store.adapterFor('').set('apiDomain', store.apiDomain);
      let model = await store.findRecord(modelName, modelId, params);
      await this.setState({ token: token, user: model }, () => logger('React Session: ', this.state));
    } catch(e) {
      await this.logout();
    } finally {
      this.setState({ loaded: true });
    }
  }

  async authenticate(modelName, data) {
    let store = this.props.store;
    LocalStorage.set('userId', data.id);
    LocalStorage.set('token', data.token);
    return await this.loadUser(store, modelName, data.id, data.token, {});
  }

  async logout() {
    localStorage.clear();
    await this.setState({ userId: '', token: '', user: {} }, () => logger('React Session: ', this.state));
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
        {loaded ? children : null}
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
