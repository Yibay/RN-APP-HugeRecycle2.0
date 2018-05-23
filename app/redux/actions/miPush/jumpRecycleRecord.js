export const JUMP_RecycleRecord = 'JUMP_RecycleRecord';
export const UNJUMP_RecycleRecord = 'UNJUMP_RecycleRecord';

export function jumpRecycleRecord(){
  return {
    type: JUMP_RecycleRecord
  }
}

export function unJumpRecycleRecord() {
  return {
    type: UNJUMP_RecycleRecord
  }
}