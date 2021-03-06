import { connect } from 'react-redux';
import { getBoard } from '../../actions/board_actions';
import { getPins, createPin, deletePin } from '../../actions/pin_actions';
import { editBoard, deleteBoard } from '../../actions/board_actions';
import Board from './board';

const mapStateToProps = ({boards, session, pins}, ownProps) => ({
  board: boards,
  boardId: ownProps.params.boardId,
  pins: pins
});

const mapDispatchToProps = (dispatch) => ({
  getBoard: (board) => dispatch(getBoard(board)),
  getPins: (id) => dispatch(getPins(id)),
  deletePin: (id) => dispatch(deletePin(id)),
  editBoard: (board) => dispatch(editBoard(board)),
  deleteBoard: (board) => dispatch(deleteBoard(board))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Board);
