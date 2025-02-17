import { IS_DOCKER_HOSTED } from '../../../config';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useStepFormPath } from '../hooks/useStepFormPath';
import { useTemplateEditorForm } from './TemplateEditorFormProvider';
import { InputVariablesForm as Component } from '../../../ee/editor';

export const InputVariablesForm = ({ onChange }: { onChange?: (data: any) => void }) => {
  const stepFormPath = useStepFormPath();
  const { watch } = useFormContext();
  const { template } = useTemplateEditorForm();
  const inputs = watch(`${stepFormPath}.template.inputs.schema`) || {};
  const workflowPayloadSchema = watch(`payloadSchema`) || {};

  const stepId = watch(`${stepFormPath}.stepId`);
  const _stepId = watch(`${stepFormPath}._id`);
  const formData = useMemo(() => {
    return {
      _workflowId: template?._id,
      workflowId: template?.triggers[0].identifier,
      stepId,
      _stepId,
    };
  }, [stepId, _stepId, template]);

  if (IS_DOCKER_HOSTED) {
    return null;
  }

  return <Component payloadSchema={workflowPayloadSchema} schema={inputs} formData={formData} onChange={onChange} />;
};
