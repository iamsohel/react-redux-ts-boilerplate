import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { Container } from 'react-bootstrap';

const Dashboard = props => {
    const { route } = props;
    return (
        <Container>
            <Suspense fallback="loading...">
                {renderRoutes(route.routes)}
            </Suspense>
        </Container>
    );
};

export default Dashboard;
