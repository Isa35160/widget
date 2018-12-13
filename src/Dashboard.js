import React, { Component } from 'react';

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const gridStyle = {
            display: 'grid',
            boxSizing: 'borderBox',
            gridGap: this.props.gutter + 'px',
            gridTemplateColumns: 'repeat(' + this.props.col + ', 1fr)',
            gridTemplateRows: 'repeat(' + this.props.row + ', calc(100vh / ' + this.props.row + '))'
        };

        const childrenWithProps = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                dashboardAnimationClassIn: this.props.animationClassIn,
                dashboardAnimationClassOut: this.props.animationClassOut
            });
        });

        return (
            <div ref={(dashboard) => { this.dashboard = dashboard; }} style={gridStyle}>
                {childrenWithProps}
            </div>
        );
    }
}

class Widget extends Component {

    constructor(props) {
        super(props);

        const styleTile = {
            textAlign: "center"
        };

        const styles = {
            widget: {
                normal: styleTile,
                large: {
                    ...styleTile,
                    gridColumnEnd: 'span 2'
                },
                tall: {
                    ...styleTile,
                    gridRowEnd: 'span 2'
                },
                big: {
                    ...styleTile,
                    gridColumnEnd: 'span 2',
                    gridRowEnd: 'span 2'
                }
            }
        };

        this.state = {
            className: 'widget',
            style: styles.widget[this.props.size]
        };

        this.animate = this.animate.bind(this);
    }

    animate() {
        return new Promise((resolve, reject) => {
            const animationClassIn = this.props.animationClassIn || this.props.dashboardAnimationClassIn || '';
            const animationClassOut = this.props.animationClassOut || this.props.dashboardAnimationClassOut || '';
            this.setState({ className: 'widget ' + animationClassOut });
            this.widget.addEventListener('animationend', () => {
                resolve();
                this.setState({ className: 'widget ' + animationClassIn });
            }, { once: true });
        });
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { animate: this.animate, ...this.props });
        });

        return (
            <div ref={(widget) => { this.widget = widget; }} className={this.state.className} style={this.state.style}>{childrenWithProps}</div>
        );
    }
}

export { Dashboard, Widget };