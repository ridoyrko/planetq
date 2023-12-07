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
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SwitchFormItem from 'src/view/shared/form/items/SwitchFormItem';
import Storage from 'src/security/storage';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import FilesFormItem from 'src/view/shared/form/items/FilesFormItem';
import * as yup from 'yup';

const schema = yup.object().shape({
  trackName: yupFormSchemas.string(
    i18n('entities.musicTrack.fields.trackName'),
    {
      "required": true,
      "min": 2
    },
  ),
  artist: yupFormSchemas.string(
    i18n('entities.musicTrack.fields.artist'),
    {
      "required": true,
      "min": 2
    },
  ),
  album: yupFormSchemas.string(
    i18n('entities.musicTrack.fields.album'),
    {
      "min": 2,
      "max": 100
    },
  ),
  cover: yupFormSchemas.images(
    i18n('entities.musicTrack.fields.cover'),
    {
      "min": 1
    },
  ),
  audioTrack: yupFormSchemas.files(
    i18n('entities.musicTrack.fields.audioTrack'),
    {
      "max": 1
    },
  ),
  externalSourceUrl: yupFormSchemas.string(
    i18n('entities.musicTrack.fields.externalSourceUrl'),
    {},
  ),
  active: yupFormSchemas.boolean(
    i18n('entities.musicTrack.fields.active'),
    {},
  ),
});

function MusicTrackForm(props) {
  const { saveLoading } = props;

  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      trackName: record.trackName,
      artist: record.artist,
      album: record.album,
      cover: record.cover || [],
      audioTrack: record.audioTrack || [],
      externalSourceUrl: record.externalSourceUrl,
      active: record.active,
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
          <InputFormItem
            name="trackName"
            label={i18n('entities.musicTrack.fields.trackName')}
            required={true}
          autoFocus
          />
        </div>
        <div className="w-full sm:w-md md:w-md lg:w-md mt-4">
          <InputFormItem
            name="artist"
            label={i18n('entities.musicTrack.fields.artist')}
            required={true}
          />
        </div>
        <div className="w-full sm:w-md md:w-md lg:w-md mt-4">
          <InputFormItem
            name="album"
            label={i18n('entities.musicTrack.fields.album')}
          placeholder={i18n('entities.musicTrack.placeholders.album')}
          hint={i18n('entities.musicTrack.hints.album')}
            required={false}
          />
        </div>
        <div className="w-full sm:w-md md:w-md lg:w-md mt-4">
          <ImagesFormItem
            name="cover"
            label={i18n('entities.musicTrack.fields.cover')}
            required={false}
            storage={Storage.values.musicTrackCover}
            max={undefined}
          />
        </div>
        <div className="w-full sm:w-md md:w-md lg:w-md mt-4">
          <FilesFormItem
            name="audioTrack"
            label={i18n('entities.musicTrack.fields.audioTrack')}
            required={false}
            storage={Storage.values.musicTrackAudioTrack}
            max={1}
            formats={["mp3","mp4"]}
          />
        </div>
        <div className="w-full sm:w-md md:w-md lg:w-md mt-4">
          <InputFormItem
            name="externalSourceUrl"
            label={i18n('entities.musicTrack.fields.externalSourceUrl')}
          placeholder={i18n('entities.musicTrack.placeholders.externalSourceUrl')}
          hint={i18n('entities.musicTrack.hints.externalSourceUrl')}
            required={false}
          />
        </div>
        <div className="w-full sm:w-md md:w-md lg:w-md mt-4">
          <SwitchFormItem
            name="active"
            label={i18n('entities.musicTrack.fields.active')}
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

export default MusicTrackForm;
