import React from 'react';
import {Dialog, Text} from '@rneui/themed';
import {DeleteCategoryDialogProps} from '../../general/interfaces';

export default function DeleteCategoryDialog({
  open,
  onBackPress,
  editHandler,
}: DeleteCategoryDialogProps): JSX.Element {
  return (
    <Dialog isVisible={open} onBackdropPress={onBackPress}>
      <Dialog.Title title={'Warning!'} />
      <Text>Are you sure you want to delete this item?</Text>
      <Dialog.Actions>
        <Dialog.Button title="Cancel" onPress={onBackPress} />
        <Dialog.Button title="Confirm" onPress={editHandler} />
      </Dialog.Actions>
    </Dialog>
  );
}
