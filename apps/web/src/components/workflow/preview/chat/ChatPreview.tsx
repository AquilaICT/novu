import { useFormContext } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { IForm } from '../../../../pages/templates/components/formTypes';
import { useStepFormPath } from '../../../../pages/templates/hooks/useStepFormPath';
import { useTemplateLocales } from '../../../../pages/templates/hooks/useTemplateLocales';
import { usePreviewChatTemplate } from '../../../../pages/templates/hooks/usePreviewChatTemplate';
import { useEffect, useState } from 'react';
import { api } from '../../../../api';
import { useEnvironment } from '../../../../hooks/useEnvironment';
import { useMutation } from '@tanstack/react-query';
import { useTemplateEditorForm } from '../../../../pages/templates/components/TemplateEditorFormProvider';
import { ChatBasePreview } from './ChatBasePreview';

export function ChatPreview({ showLoading = false, inputVariables }: { showLoading?: boolean; inputVariables?: any }) {
  const { watch, formState } = useFormContext<IForm>();
  const { template } = useTemplateEditorForm();
  const { bridge } = useEnvironment({}, template?.bridge);
  const path = useStepFormPath();
  const content = watch(`${path}.template.content`);
  const { pathname } = useLocation();
  const isPreviewPath = pathname.endsWith('/preview');
  const stepId = watch(`${path}.uuid`);
  const [bridgeContent, setBridgeContent] = useState('');

  const {
    mutateAsync,
    isLoading: isBridgeLoading,
    error: previewError,
  } = useMutation((data) => api.post('/v1/echo/preview/' + formState?.defaultValues?.identifier + '/' + stepId, data), {
    onSuccess(data) {
      setBridgeContent(data.outputs.body);
    },
  });

  useEffect(() => {
    if (bridge) {
      mutateAsync(inputVariables);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bridge, inputVariables]);

  const { selectedLocale, locales, areLocalesLoading, onLocaleChange } = useTemplateLocales({
    content: content as string,
    disabled: showLoading || bridge,
  });

  const { isPreviewContentLoading, previewContent, templateError } = usePreviewChatTemplate({
    locale: selectedLocale,
    disabled: showLoading || bridge,
  });

  return (
    <ChatBasePreview
      content={previewContent || bridgeContent}
      onLocaleChange={onLocaleChange}
      locales={locales || []}
      selectedLocale={selectedLocale}
      showEditOverlay={isPreviewPath}
      error={bridge ? undefined : templateError}
      loading={showLoading || areLocalesLoading || isPreviewContentLoading || isBridgeLoading}
    />
  );
}
