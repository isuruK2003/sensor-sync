import React from 'react';
import { Icon } from '../fragments/icon';

import { List, Group, Item, ItemLeft, ItemText } from '../fragments/list';

export default function Settings() {
    const handlePress = () => {
        console.log('Settings item pressed');
    };

    return (
        <List>
            <Group>
                <Item callBack={handlePress}>
                    <ItemLeft>
                        <Icon name="information-circle-outline" />
                        <ItemText>About</ItemText>
                    </ItemLeft>
                    <Icon type="feather" name="chevron-right" color='#666' />
                </Item>
                <Item callBack={handlePress}>
                    <ItemLeft>
                        <Icon name="information-circle-outline" />
                        <ItemText>About</ItemText>
                    </ItemLeft>
                    <Icon type="feather" name="chevron-right" color='#666' />
                </Item>
                <Item callBack={handlePress}>
                    <ItemLeft>
                        <Icon name="information-circle-outline" />
                        <ItemText>About</ItemText>
                    </ItemLeft>
                    <Icon type="feather" name="chevron-right" color='#666' />
                </Item>
            </Group>
            <Group>
                <Item callBack={handlePress}>
                    <ItemLeft>
                        <Icon name="information-circle-outline" />
                        <ItemText>About</ItemText>
                    </ItemLeft>
                    <Icon type="feather" name="chevron-right" color='#666' />
                </Item>
                <Item callBack={handlePress}>
                    <ItemLeft>
                        <Icon name="information-circle-outline" />
                        <ItemText>About</ItemText>
                    </ItemLeft>
                    <Icon type="feather" name="chevron-right" color='#666' />
                </Item>
                <Item callBack={handlePress}>
                    <ItemLeft>
                        <Icon name="information-circle-outline" />
                        <ItemText>About</ItemText>
                    </ItemLeft>
                    <Icon type="feather" name="chevron-right" color='#666' />
                </Item>
            </Group>
        </List>
    );
};