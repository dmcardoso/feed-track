import React, { useContext } from 'react';
import { Container, Close, InsideContainer } from './style';
import ActivitiesCard from '../activities-card';
import { PageContext } from '../page';
import Button from '../button';

function SideActivities(props) {
    const { sideActivitiesVisible, setSideActivitiesVisible, activities } = useContext(PageContext);

    return (
        <Container sideActivitiesVisible={sideActivitiesVisible}>
            <Close
                className="icon-cancel"
                onClick={() => setSideActivitiesVisible(false)}
                sideActivitiesVisible={sideActivitiesVisible}
            />
            <InsideContainer>
                {activities.map(activity => (
                    <ActivitiesCard key={activity.id} message={activity.mensagem} hour={activity.criacao} />
                ))}
                <Button align-self="flex-end" margin="58px 0 0 0" label="Ver mais" />
            </InsideContainer>
        </Container>
    );
}

export default SideActivities;
