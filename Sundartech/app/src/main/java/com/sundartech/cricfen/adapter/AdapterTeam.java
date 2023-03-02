package com.sundartech.cricfen.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;
import com.sundartech.cricfen.model.Team;
import com.sundartech.cricfen.viewholder.ViewHolderTeam;

import java.lang.reflect.Field;
import java.util.List;

public class AdapterTeam extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<Team> mListTeam;
    private Context mContext;

    public AdapterTeam(Context mContext, List<Team> mListTeam) {
        this.mContext = mContext;
        this.mListTeam = mListTeam;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_team, parent, false);
        return new ViewHolderTeam(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderTeam) {
            populateCastItem((ViewHolderTeam) holder, position);
        }
    }

    @SuppressLint("ResourceType")
    private void populateCastItem(final ViewHolderTeam holder, final int position) {

        holder.mImageViewTeamFlag.setImageResource(mListTeam.get(position).getTeamFlag());
        holder.mTextViewTeamName.setText(mListTeam.get(position).getTeamName());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                /*Intent intent = new Intent(mContext, ActivityExploredCinema.class);
                intent.putExtra("SEARCHABLE_STRING_KEY", mListCast.get(position).getName());
                intent.putExtra("TYPE_KEY", "Cast");
                mContext.startActivity(intent);*/
            }
        });

        holder.mLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.itemView.performClick();
            }
        });

    }

    public static int getResId(String resName, Class<?> c) {

        try {
            Field idField = c.getDeclaredField(resName);
            return idField.getInt(idField);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public int getItemCount() {
        return mListTeam.size();
    }

    public void clear() {
        int size = mListTeam.size();
        mListTeam.clear();
        notifyItemRangeRemoved(0, size);
    }
}