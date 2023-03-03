import { Server } from 'shared/lib/source';
import {StudentModel} from '../models/StudentModel';
import { StackOpener } from 'shared/ui/popup';
import { PopupConfig } from 'shared/hooks/usePopup';

export const SOURCE_GROUPS = new Server({
   endpoint: 'groups'
});

export const SOURCE_STUDENTS = new Server({
   endpoint: 'students',
   model: StudentModel
});

export const GROUP_ALL_ID = '0000';

export const GROUP_ALL = {
   id: GROUP_ALL_ID,
   name: 'Все'
}

interface FilterGroup {
   group: string;
}

export const FILTER_GROUP_INITIAL_STATE: FilterGroup | {} = {};

export const getStackCreateGroup = (): PopupConfig => {
   return StackOpener.create({
      templateOptions: {
         headerTitle: 'Создание группы',
         width: 600,
         bodyContent: <div>Создание группы</div>
      }
   });
};

export const getStackCreateStudent = (): PopupConfig => {
   return StackOpener.create({
      templateOptions: {
         headerTitle: 'Создание карточки студента',
         bodyContent: <div>Карточка Студента</div>
      }
   });
};