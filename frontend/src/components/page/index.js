import React, {
    useState, createContext, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
    Container, Activities, History, Title,
} from './style';
import {
    Column, Main, MainContainer, RowSpaceBetween,
} from '../app-container/style';
import SideActivities from '../side-activities';
import { AppContainerContext } from '../app-container';
import Loader from '../loader';

const PageContext = createContext();

function Page({ children, title }) {
    const { activities, setActivities, loading } = useContext(AppContainerContext);
    const [sideActivitiesVisible, setSideActivitiesVisible] = useState(false);

    useEffect(() => () => {
        setActivities([]);
    }, []);

    if (loading) {
        return (
            <Loader />
        );
    }


    return (
        <PageContext.Provider value={{
            sideActivitiesVisible, setSideActivitiesVisible, activities, setActivities,
        }}
        >
            <>
                <Container>
                    <Main>
                        <MainContainer sideActivitiesVisible={sideActivitiesVisible}>
                            <Column>
                                <RowSpaceBetween margin="0 0 50px 0">
                                    <Title>{title}</Title>
                                    {
                                        (activities.length > 0)
                                        && (
                                            <Activities
                                                onClick={() => setSideActivitiesVisible(!sideActivitiesVisible)}
                                                sideActivitiesVisible={sideActivitiesVisible}
                                            >
                                                <History
                                                    className="icon-history"
                                                    sideActivitiesVisible={sideActivitiesVisible}
                                                />
                                            Atividades
                                            </Activities>
                                        )
                                    }
                                </RowSpaceBetween>
                                {children}
                            </Column>
                        </MainContainer>
                        {(activities.length > 0) && <SideActivities />}
                    </Main>
                </Container>
            </>
        </PageContext.Provider>
    );
}

Page.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string.isRequired,
};

export default Page;
export { PageContext };
