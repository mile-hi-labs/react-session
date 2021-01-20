import React, { Component } from 'react';
import LocalStorage from 'local-storage';
import { loadContext } from 'session/load-context';
import { logger } from 'utils/helpers';

const SessionContext = React.createContext();

class SessionProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      params: this.props.params || {},
      modelName: this.props.modelName || 'user',
      loadSession: this.loadSession.bind(this),
      authenticated: this.authenticated.bind(this),
      authenticate: this.authenticate.bind(this),
      logout: this.logout.bind(this),
      loaded: false,
    };
  }

  // Hooks
  componentDidMount() {
    let store = this.props.store;
    let modelName = this.state.modelName;
    let userId = LocalStorage.get('userId');
    let token = LocalStorage.get('token');
    let params = this.state.params;
    (userId && token) ? this.loadSession(store, modelName, userId, token, params) : this.setState({ loaded: true });
  }

  // Methods
  async loadSession(store, modelName, modelId, token, params = {}) {
    try {
      store.adapterFor('').set('token', token);
      let model = await store.findRecord(modelName, modelId, params);
      logger('React Session: ', this.state);
      this.setState({ user: model, token: token });
    } catch (e) {
      logger(e);
      await this.logout();
    } finally {
      this.setState({ loaded: true });
    }
  }

  async updateSession() {
    try {
      let store = this.props.store;
      let modelName = this.state.modelName;
      let userId = LocalStorage.get('userId');
      let token = LocalStorage.get('token');
      let params = this.state.params;
      return await this.loadSession(store, modelName, userId, token, params);
    } catch (e) {
      logger(e);
    }
  }

  async authenticate(modelName, data) {
    let store = this.props.store;
    LocalStorage.set('userId', data.id);
    LocalStorage.set('token', data.token);
    let params = this.state.params;
    return await this.loadSession(store, modelName, data.id, data.token, params);
  }

  async logout() {
    localStorage.clear();
    await this.setState({userId: null, token: null, user: {}}, () => logger('React Session: ', this.state));
  }

  authenticated() {
    return this.state.user.id ? true : false;
  }

  // Render
  render() {
    const { loaded } = this.state;
    const { children } = this.props;

    return (
      <SessionContext.Provider value={this.state}>
        {loaded ? children : null}
      </SessionContext.Provider>
    );
  }
}

const withSession = function (WrappedFunction) {
  return class extends Component {
    render() {
      return (
        <SessionContext.Consumer>
          {context => <WrappedFunction session={context} {...this.props} />}
        </SessionContext.Consumer>
      );
    }
  };
};

export { SessionProvider, withSession };
