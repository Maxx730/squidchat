import React,{ Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { connect } from 'react-redux'
import { ResetMessage,UpdateMessage } from '../actions/ComposeActions'

class EmojiModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            Emojis:["em-face_with_hand_over_mouth","em-kissing_smiling_eyes","em-slightly_smiling_face","em-smile","em-smile_cat","em-smiley","em-smiley_cat","em-smiling_imp","em-sweat_smile","em-grin","em-grinning","em-star-struck","em-zany_face","em-clown_face","em-crying_cat_face","em-dizzy_face","em-dragon_face","em-drooling_face","em-exploding_head","em-face_palm","em-face_vomiting","em-face_with_cowboy_hat","em-face_with_hand_over_mouth","em-face_with_head_bandage","em-face_with_monocle","em-face_with_raised_eyebrow","em-face_with_rolling_eyes","em-face_with_symbols_on_mouth","em-face_with_thermometer","em-facepunch","em-first_quarter_moon_with_face","em-fox_face","em-full_moon_with_face","em-giraffe_face","em-hugging_face","em-last_quarter_moon_with_face","em-lion_face","em-lying_face","em-man-facepalming","em-money_mouth_face","em-monkey_face","em-nauseated_face","em-nerd_face","em-neutral_face","em-new_moon_with_face","em-panda_face","em-person_with_pouting_face","em-robot_face","em-shushing_face","em-slightly_frowning_face","em-slightly_smiling_face","em-sneezing_face","em-star-struck","em-sun_with_face","em-thinking_face","em-tired_face","em-unicorn_face","em-upside_down_face","em-white_frowning_face","em-wind_blowing_face","em-woman-facepalming","em-zany_face","em-zebra_face","em-zipper_mouth_face","em-mens","em-mermaid","em-merman","em-merperson","em-metro","em-microphone","em-microscope","em-middle_finger","em-milky_way","em-minibus","em-minidisc","em-mobile_phone_off","em-money_mouth_face","em-money_with_wings","em-moneybag","em-monkey","em-monkey_face","em-monorail","em-moon","em-mortar_board","em-mosque","em-mostly_sunny","em-motor_boat","em-motor_scooter","em-motorway","em-mount_fuji","em-mountain","em-mountain_bicyclist","em-mountain_cableway","em-mountain_railway","em-mouse","em-mouse2","em-movie_camera","em-moyai","em-mrs_claus","em-muscle","em-mushroom","em-musical_keyboard","em-musical_note "]
        }
    }
    render(){
        return(
            <Dialog open={true}>
                <DialogContent>
                    {
                        this.state.Emojis.map((Emoji) => {
                            return(
                                <IconButton onClick={
                                    (evt) => {
                                        this.props.UpdateMessage({
                                            Message:this.props.Message.Message + "<emoji>" +Emoji+ "<emoji>",
                                            Type:"standard"
                                        })

                                        this.props.ToggleEmoji(false)
                                    }
                                }>
                                    <i class={"em "+Emoji}></i>
                                </IconButton>
                            )
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={
                        () => {
                            this.props.ToggleEmoji(false)
                        }
                    }>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        Message:state.Message
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        UpdateMessage: (Message) => {
            UpdateMessage(dispatch,Message)
        },
        ResetMessage: (dispatch) => {
            ResetMessage(dispatch)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EmojiModal)