export interface LauncherPositionProps {
  launcherPosition: string;
}

export const isLeftOrRight = (props: LauncherPositionProps) => props.launcherPosition === 'RIGHT' || props.launcherPosition === 'LEFT';
