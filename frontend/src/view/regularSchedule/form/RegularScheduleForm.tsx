import { faSave } from '@fortawesome/free-regular-svg-icons';
import {
  faTimes,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import regularScheduleEnumerators from 'src/modules/regularSchedule/regularScheduleEnumerators';
import MusicTrackAutocompleteFormItem from 'src/view/musicTrack/autocomplete/MusicTrackAutocompleteFormItem';
import * as yup from 'yup';

const schema = yup.object().shape({
  day: yupFormSchemas.enumerator(
    i18n('entities.regularSchedule.fields.day'),
    {
      "required": true,
      "options": regularScheduleEnumerators.day
    },
  ),
  musicTrack: yupFormSchemas.relationToMany(
    i18n('entities.regularSchedule.fields.musicTrack'),
    {
      "min": 1,
      "required": true
    },
  ),
});

function RegularScheduleForm(props) {
  const { saveLoading } = props;

  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      day: record.day,
      musicTrack: record.musicTrack || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full sm:w-md md:w-md lg:w-md">
          <SelectFormItem
            name="day"
            label={i18n('entities.regularSchedule.fields.day')}
          placeholder={i18n('entities.regularSchedule.placeholders.day')}
            options={regularScheduleEnumerators.day.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.regularSchedule.enumerators.day.${value}`,
                ),
              }),
            )}
            required={true}
          />
        </div>
        <div className="w-full sm:w-md md:w-md lg:w-md mt-4">
          <MusicTrackAutocompleteFormItem  
            name="musicTrack"
            label={i18n('entities.regularSchedule.fields.musicTrack')}
          placeholder={i18n('entities.regularSchedule.placeholders.musicTrack')}
            required={true}
            showCreate={!props.modal}
            mode="multiple"
          />
        </div>

        <div className="pt-4">
          <button
            className="mr-2 mb-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            disabled={saveLoading}
            type="button"
            onClick={form.handleSubmit(onSubmit)}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faSave}
            />
            {i18n('common.save')}
          </button>

          <button
            disabled={saveLoading}
            onClick={onReset}
            className="mr-2 mb-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            type="button"
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faUndo}
            />
            {i18n('common.reset')}
          </button>

          {props.onCancel ? (
            <button
              disabled={saveLoading}
              onClick={() => props.onCancel()}
              className="mr-2 mb-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              type="button"
            >
              <FontAwesomeIcon
                className="mr-2"
                icon={faTimes}
              />
              {i18n('common.cancel')}
            </button>
          ) : null}
        </div>
      </form>
    </FormProvider>
  );
}

export default RegularScheduleForm;
