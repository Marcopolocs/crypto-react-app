import { CircularProgress } from '@mui/material';

type generalCircularProgressProps = {
  color?: string;
  thickNess?: number;
  size?: number;
};

const GeneralCircularProgress: React.FC<generalCircularProgressProps> = ({ color = '#fff', thickNess = 6, size = 20 }) => {
  return <CircularProgress size={size} thickness={thickNess} sx={{ color }} />;
};

export default GeneralCircularProgress;
