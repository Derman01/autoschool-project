import { OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { GroupDataForm } from 'pages/Students/ui/helpers/Constants';

export const createGroup = (afterCreate: () => void) => {
    const onResult = (data: object) => {
        return new Server({
            endpoint: 'groups',
        })
            .call('create', {
                ...data,
            })
            .then(() => afterCreate());
    };

    OpenForm(
        {
            width: 430,
            headerTitle: 'Добавить группу',
        },
        {
            data: GroupDataForm,
            onResult,
        }
    );
};
