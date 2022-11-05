// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconUserCheck, IconFiles, IconUserPlus, IconFilePlus, IconList } from '@tabler/icons';

// constant
const icons = {
    IconUserCheck,
    // IconBasket,
    // IconMessages,
    // IconLayoutKanban,
    // IconMail,
    // IconCalendar,
    // IconNfc,
    IconFiles,
    IconUserPlus,
    IconFilePlus,
    IconList
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
    id: 'application',
    title: <FormattedMessage id="application" />,
    type: 'group',
    children: [
        {
            id: 'users',
            title: <FormattedMessage id="Genders" />,
            type: 'collapse',
            icon: icons.IconUserCheck,
            children: [
                {
                    id: 'gender-create',
                    title: <>Add New Gender</>,
                    type: 'item',
                    icon: icons.IconUserPlus,
                    url: '/genders/add-gender'
                },

                {
                    id: 'card1',
                    title: <>Genders List</>,
                    type: 'item',
                    icon: icons.IconList,
                    url: '/genders/genders-list'
                }

                // {
                //     id: 'card2',
                //     title: <>Genders Search</>,
                //     type: 'item',
                //     icon: icons.IconFind,
                //     url: '/genders/genders-search'
                // }
            ]
        },

        {
            id: 'projects',
            title: <FormattedMessage id="Users" />,
            type: 'collapse',
            icon: icons.IconUserCheck,
            children: [
                // {
                //     id: 'project-create',
                //     title: <>Add New User</>,
                //     type: 'item',
                //     icon: icons.IconFilePlus,
                //     url: '/project/add-project'
                // },
                {
                    id: 'user-listing',
                    title: <>Users List</>,
                    type: 'item',
                    icon: icons.IconList,
                    url: '/users/user-list'
                }
            ]
        }
    ]
};

export default application;
