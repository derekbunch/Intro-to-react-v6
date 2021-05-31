// Mostly took this from the React docs
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends React.Component {
  state = { haserror: false, redirect: false };

  static getDerivedStateFromError() {
    return { haserror: true };
  }
  componentDidCatch(error, info) {
    // I log this to Sentry, Azure Monitor, New Relic, TrackJS
    console.log("ErrorBoundary caught an error", error, info);
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.haserror) {
      return (
        <h2>
          This listing has an error. <Link to="/">Click here</Link> to go back
          to the home page or wait 5 seconds.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
